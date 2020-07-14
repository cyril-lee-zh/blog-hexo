---
title: JPA有趣的玩法之结合接口映射
comments: true
tags:
  - spring-boot
  - jpa
categories:
  - [笔记]
  - [java]
keywords:
  - spring-data-jpa
---

这两天雨大水深，我也一直在潜水。到哪里潜水了呢？那还用说，当然是做需求去了！
最近接到一个需求，要将服务器1库里的每天固定某段时间的数据同步给服务器2库里。很简单吧，好嗨哦，接到一个需求很快就做完咯。嗯！孰不知，尴尬之路就此开启=====>>>
1、我们是微服务架构，同步数据要写在其中一个服务里面，这个服务用的是JPA框架。也就是说这次这个功能要用JPA实现。（至于为什么不单独开个python服务或者改用别的方式啥的，don't ask me why!）
2、之前整理全量数据时，已经整理好数据脚本（嗯~“感谢”有了这成形的脚本，不然也不会有这篇记录文的产生）。这个脚本呢，left join了四张表，每张表里面取部分字段。有些字段需要进行转换，比如说本来性别存的是int型，要转成“Mr”，“Ms”，本来生日是分别存进年月日三列的，同步过去要转换成一列等等奇葩转换。
当然，现有的sql脚本已经用MySQL的内置函数处理好了。比如说这样：
``` sql
SELECT c.column1,d.column2,IF(a.column3=0,'x','y'),CONCAT(a.column3,a.column4,a.column5) as string1,IF(a1.years>0,CONCAT(a1.years,'-',a1.months,'-',a1.days), NULL) AS bornday
FROM
	table1 a
	LEFT JOIN table2 b ON a.id = b.a_id
	LEFT JOIN table3 c ON b.id = c.b_id
	LEFT JOIN table4 d on a.id = d.a_id
where ISNULL(c.column1)=FALSE and LENGTH(TRIM(c.column3))>0 and DATE_FORMAT(STR_TO_DATE('','%y-%m-%d'),'%m-%d') between '' and ''...

```
对于mysql语法来说那是超级简单呐，可是现在我要把它转成jpa去执行，毫无疑问，肯定是用jpa的nativesql啦！

上面背景介绍完了，下面我们切到主题模式，毕竟我这篇是想介绍怎样用jpa来实现这种复杂sql的~

好，既然用了nativesql,那select出来的那些自定义列要怎么用jpa接收？
定义一个接口：EntityVO,这个样子，
``` java
public interface EntityVO(){
	String getColumn1();
	Date getColumn2();
	Integer getColumn3();
	String getColumn4();
	String getColumn5();
}

```
Repository里面映射这个接口：
``` java
@Query(value = "SELECT ...", nativeQuery = true)
List<EntityVO> fetchDataList(@Param("column1")String column1);
```
查mysql的逻辑已经完成了。现在开始写java接收数据的逻辑。
Java接收的话需要先将映射的接口转化成实体类DTO，这时候java的Function函数闪亮登场,噔噔噔，噔噔噔，噔噔噔噔噔噔噔噔噔,再结合lambda，哇塞，要多简洁有多简洁。
``` java
Function<EntityVO, EntityDTO> function = vo -> new EntityDTO(vo.getColumn1(), vo.getColumn2(), vo.getColumn3(), vo.getColumn4(), vo.getColumn5());
List<EntityDTO> entityDTOs = voList.stream().map(vo -> function.apply(vo)).collect(Collectors.toList());
```
完成！
再通过FeignClient将数据传给接收端的服务里，当然这里开启了一个线程去处理，毕竟还是有些时间去处理入库任务的，不另起个线程，不得卡半天？
切记，不要自己手动创建线程，而是通过线程池来管理线程.
至此，功能完成~

<p align="right">—— by kylin</p>