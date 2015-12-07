### Collection
 Collection变量首字母大写驼峰复数，数据库名称首字母小写驼峰复数，比如
 
 Todos = new Mongo.Collection('todos');
 
### Schema
 单数   
 首字母大写驼峰   
 
```
  Schema.ContactList = new SimpleSchema(
      name:
      type: String
      label: '姓名'
      optional: false
      gender:
      type: String
      label: '性别'
      autoform:
        allowedValues:['男','女']
        options: ->
          男:'男'
          女:'女'
  )
        
```  


## Schema

主要的 Collection 都需要 Attach Schema.   
用 Collection2 代替 Collection. 无论是否使用 Autoform
