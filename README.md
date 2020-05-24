# Expense Tracker

使用 Node.js 、 Express框架 、 MongodDB 的練習作品，加入 CRUD 功能，並利用method-override 達到 RESTful 設計，建立簡易的記帳 app。

![home_page](./public/img/home_page.png "Home Page")
![filtered_page](./public/img/filtered_page.png "Filter records by category")
![create_page](./public/img/create_page.png "Create Record Page")
![edit_page](./public/img/edit_page.png "Edit Page")

## Features

* 在首頁一次瀏覽所有支出的清單，且可看到所有支出清單的總金額
* 新增一筆支出
* 編輯支出的所有屬性 (一次只能編輯一筆)
* 刪除任何一筆支出 (一次只能刪除一筆)
* 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和。

## Link to the Page

[=> Expense Tracker](https://enigmatic-tor-85566.herokuapp.com/)

## Installing to Local Computer

1. 終端機輸入
```
git clone https://github.com/mia-chen-taiwan/expense-tracker.git
```

2. 安裝套件
```
npm install
```

3. 執行腳本
```
npm run seed
```

4. 執行
```
npm run dev
```

## Built With & Tools

* Express framework
* Express-handlebars
* body-parser
* mongoose
* method-override
* CDN include Bootstrap, jQuery, Popper.js and fontawesome