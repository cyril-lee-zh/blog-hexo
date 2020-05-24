---
title: spring-boot 启动原理
comments: true
tags:
  - spring-boot
  - spring
categories:
  - [笔记]
  - [源码解析]
  - [java]
keywords:
  - spring-boot
  - spring-boot 原理
  - spring
---

**基于spring-boot 2.1.0**
**`new SpringApplication(primarySources).run(args);`**

## 第一步 创建SpringApplication

```
public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
		this.resourceLoader = resourceLoader;
		Assert.notNull(primarySources, "PrimarySources must not be null");
		this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));
		
		// 1. 判断web应用类型
		this.webApplicationType = WebApplicationType.deduceFromClasspath();
		// 2. 找到类路径下 META-INF/spring.factories 文件中所有申明的ApplicationContextInitializer实现类，进行初始化，并给springApplication设置initializers属性
		setInitializers((Collection) getSpringFactoriesInstances(
				ApplicationContextInitializer.class));
		// 3. 找到类路径下 META-INF/spring.factories 文件中所有申明的ApplicationListener实现类，进行初始化，并给springApplication设置initializers属性
		setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
		// 4. 判断应用主配置类
		this.mainApplicationClass = deduceMainApplicationClass();
	}
```

1. 判断web应用类型

	根据 相关类和其依赖的类是否存在且可以被加载
	
	```
	 * Determine whether the {@link Class} identified by the supplied name is present
	 * and can be loaded. Will return {@code false} if either the class or
	 * one of its dependencies is not present or cannot be loaded.
 	public static boolean isPresent(String className, @Nullable ClassLoader classLoader) {
 		...
 	}

	```
	
	web应用类型分为三种：
	
		- WebApplicationType.SERVLET web类型(spring-mvc)
		- WebApplicationType.REACTIVE 响应式web类型(spring-webflux)
		- WebApplicationType.NONE webmvc(非web应用)

	```
		static WebApplicationType deduceFromClasspath() {
			if (ClassUtils.isPresent(WEBFLUX_INDICATOR_CLASS, null)
					&& !ClassUtils.isPresent(WEBMVC_INDICATOR_CLASS, null)
					&& !ClassUtils.isPresent(JERSEY_INDICATOR_CLASS, null)) {
				return WebApplicationType.REACTIVE;
			}
			for (String className : SERVLET_INDICATOR_CLASSES) {
				if (!ClassUtils.isPresent(className, null)) {
					return WebApplicationType.NONE;
				}
			}
			return WebApplicationType.SERVLET;
		}
	```
	
2. 初始化`ApplicationContextInitializer`并设置initializers

	```
	private <T> Collection<T> getSpringFactoriesInstances(Class<T> type,
				Class<?>[] parameterTypes, Object... args) {
			ClassLoader classLoader = getClassLoader();
			// Use names and ensure unique to protect against duplicates
			// 获取到所有的 ApplicationContextInitializer 类名
			Set<String> names = new LinkedHashSet<>(
					SpringFactoriesLoader.loadFactoryNames(type, classLoader));
			// 创建 ApplicationContextInitializer 实例
			List<T> instances = createSpringFactoriesInstances(type, parameterTypes,
					classLoader, args, names);
			// 根据 Order 注解进行排序
			AnnotationAwareOrderComparator.sort(instances);
			return instances;
		}
	```

	主要是通过`SpringFactoriesLoader.loadFactoryNames`方法，获取到所有的`ApplicationContextInitializer `类名，创建实例，并设置属性。
	`SpringFactoriesLoader.loadFactoryNames`方法调用的内部核心方法是**`SpringFactoriesLoader. loadSpringFactories `**方法，主要就是
	
	```
	private static Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader) {
		MultiValueMap<String, String> result = cache.get(classLoader);
		if (result != null) {
			return result;
		}

		try {
			// FACTORIES_RESOURCE_LOCATION -> "META-INF/spring.factories"
			Enumeration<URL> urls = (classLoader != null ?
					classLoader.getResources(FACTORIES_RESOURCE_LOCATION) :
					ClassLoader.getSystemResources(FACTORIES_RESOURCE_LOCATION));
			result = new LinkedMultiValueMap<>();
			while (urls.hasMoreElements()) {
				URL url = urls.nextElement();
				UrlResource resource = new UrlResource(url);
				Properties properties = PropertiesLoaderUtils.loadProperties(resource);
				for (Map.Entry<?, ?> entry : properties.entrySet()) {
					String factoryClassName = ((String) entry.getKey()).trim();
					// 逗号分隔获取类名
					for (String factoryName : StringUtils.commaDelimitedListToStringArray((String) entry.getValue())) {
						result.add(factoryClassName, factoryName.trim());
					}
				}
			}
			cache.put(classLoader, result);
			return result;
		}
		catch (IOException ex) {
			throw new IllegalArgumentException("Unable to load factories from location [" +
					FACTORIES_RESOURCE_LOCATION + "]", ex);
		}
	}
	```
	
3. 初始化`ApplicationListener`并设置listeners

	**同 1.2中 ApplicationContextInitializer 类的加载**

4. 判断主配置类

	根据`main`方法名判断主配置类

```
private Class<?> deduceMainApplicationClass() {
		try {
			StackTraceElement[] stackTrace = new RuntimeException().getStackTrace();
			for (StackTraceElement stackTraceElement : stackTrace) {
				if ("main".equals(stackTraceElement.getMethodName())) {
					return Class.forName(stackTraceElement.getClassName());
				}
			}
		}
		catch (ClassNotFoundException ex) {
			// Swallow and continue
		}
		return null;
	}
```

## 运行run方法

```
public ConfigurableApplicationContext run(String... args) {
		// 启动watch监听
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		// 初始化一个空的ioc容器
		ConfigurableApplicationContext context = null;
		Collection<SpringBootExceptionReporter> exceptionReporters = new ArrayList<>();
		// 配置awt相关属性
		configureHeadlessProperty();
		// 1. 获取SrpingApplicationRunListener
		SpringApplicationRunListeners listeners = getRunListeners(args);
		// 回调所有	 SpringApplicationRunListeners 实现类的starting方法
		listeners.starting();
		try {
			// 封装命令行参数
			ApplicationArguments applicationArguments = new DefaultApplicationArguments(
					args);
			// 准备环境
			ConfigurableEnvironment environment = prepareEnvironment(listeners,
					applicationArguments);
			configureIgnoreBeanInfo(environment);
			// 打印banner,default location: class-path:banner.txt
			Banner printedBanner = printBanner(environment);
			// 根据web类型，创建对应ioc容器（利用反射调用无参构造器创建）
			context = createApplicationContext();
			// 初始化异常报告器
			exceptionReporters = getSpringFactoriesInstances(
					SpringBootExceptionReporter.class,
					new Class[] { ConfigurableApplicationContext.class }, context);
			// 2. 准备上下文环境
			prepareContext(context, environment, listeners, applicationArguments,
					printedBanner);
			// 3. 刷新ioc容器，即调用其refresh方法进行容器初始化
			refreshContext(context);
			afterRefresh(context, applicationArguments);
			stopWatch.stop();
			if (this.logStartupInfo) {
				new StartupInfoLogger(this.mainApplicationClass)
						.logStarted(getApplicationLog(), stopWatch);
			}
			// 回调所有	 SpringApplicationRunListeners 实现类的started方法
			listeners.started(context);
			// 4. 从ioc容器中获取所有 ApplicationRunner 和 CommandLineRunner，调用其run方法
			callRunners(context, applicationArguments);
		}
		catch (Throwable ex) {
			handleRunFailure(context, ex, exceptionReporters, listeners);
			throw new IllegalStateException(ex);
		}

		try {
			// 回调所有	 SpringApplicationRunListeners 实现类的running方法
			listeners.running(context);
		}
		catch (Throwable ex) {
			handleRunFailure(context, ex, exceptionReporters, null);
			throw new IllegalStateException(ex);
		}
		// 整个spring boot启动完成后，返回ioc容器
		return context;
	}

```

1. 获取`SrpingApplicationRunListener `

	**同 1.2中 ApplicationContextInitializer 类的加载**
	
2. 准备上下文环境

	```
	private void prepareContext(ConfigurableApplicationContext context,
				ConfigurableEnvironment environment, SpringApplicationRunListeners listeners,
				ApplicationArguments applicationArguments, Banner printedBanner) {
			// 将之前的 environment 设置给ioc容器
			context.setEnvironment(environment);
			postProcessApplicationContext(context);
			// 回调所有 ApplicationContextInitializer 的 initialize 方法
			applyInitializers(context);
			// 回调所有	 SpringApplicationRunListeners 实现类的contextPrepared方法
			listeners.contextPrepared(context);
			if (this.logStartupInfo) {
				logStartupInfo(context.getParent() == null);
				logStartupProfileInfo(context);
			}
			// Add boot specific singleton beans
			ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
			beanFactory.registerSingleton("springApplicationArguments", applicationArguments);
			if (printedBanner != null) {
				beanFactory.registerSingleton("springBootBanner", printedBanner);
			}
			if (beanFactory instanceof DefaultListableBeanFactory) {
				((DefaultListableBeanFactory) beanFactory)
						.setAllowBeanDefinitionOverriding(this.allowBeanDefinitionOverriding);
			}
			// Load the sources
			// load主配置类，注册到ioc容器中
			Set<Object> sources = getAllSources();
			Assert.notEmpty(sources, "Sources must not be empty");
			load(context, sources.toArray(new Object[0]));
			listeners.contextLoaded(context);
		}
	```

3. ioc容器`refresh`

	```
	public void refresh() throws BeansException, IllegalStateException {
			synchronized (this.startupShutdownMonitor) {
				// Prepare this context for refreshing.
				prepareRefresh();
	
				// Tell the subclass to refresh the internal bean factory.
				ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();
	
				// Prepare the bean factory for use in this context.
				prepareBeanFactory(beanFactory);
	
				try {
					// Allows post-processing of the bean factory in context subclasses.
					postProcessBeanFactory(beanFactory);
	
					// Invoke factory processors registered as beans in the context.
					invokeBeanFactoryPostProcessors(beanFactory);
	
					// Register bean processors that intercept bean creation.
					registerBeanPostProcessors(beanFactory);
	
					// Initialize message source for this context.
					initMessageSource();
	
					// Initialize event multicaster for this context.
					initApplicationEventMulticaster();
	
					// Initialize other special beans in specific context subclasses.
					onRefresh();
	
					// Check for listener beans and register them.
					registerListeners();
	
					// Instantiate all remaining (non-lazy-init) singletons.
					finishBeanFactoryInitialization(beanFactory);
	
					// Last step: publish corresponding event.
					finishRefresh();
				}
	
				catch (BeansException ex) {
					if (logger.isWarnEnabled()) {
						logger.warn("Exception encountered during context initialization - " +
								"cancelling refresh attempt: " + ex);
					}
	
					// Destroy already created singletons to avoid dangling resources.
					destroyBeans();
	
					// Reset 'active' flag.
					cancelRefresh(ex);
	
					// Propagate exception to caller.
					throw ex;
				}
	
				finally {
					// Reset common introspection caches in Spring's core, since we
					// might not ever need metadata for singleton beans anymore...
					resetCommonCaches();
				}
			}
		}
	
	```

4. 调用`ApplicationRunner `和`CommandLineRunner `的run方法

先调用所有`ApplicationRunner`,后调用所有`CommandLineRunner `
	
	```
	private void callRunners(ApplicationContext context, ApplicationArguments args) {
			List<Object> runners = new ArrayList<>();
			runners.addAll(context.getBeansOfType(ApplicationRunner.class).values());
			runners.addAll(context.getBeansOfType(CommandLineRunner.class).values());
			AnnotationAwareOrderComparator.sort(runners);
			for (Object runner : new LinkedHashSet<>(runners)) {
				if (runner instanceof ApplicationRunner) {
					callRunner((ApplicationRunner) runner, args);
				}
				if (runner instanceof CommandLineRunner) {
					callRunner((CommandLineRunner) runner, args);
				}
			}
		}
	```
