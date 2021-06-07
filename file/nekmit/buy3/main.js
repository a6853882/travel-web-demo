var shoplist = {};

shoplist.name = "My BuyList 購物清單";
shoplist.time = new Date().getFullYear()+"/"+(new Date().getMonth()+1)+"/"+new Date().getDate();
shoplist.list = [];
shoplist.menu = {
  Starter:[
    {name: "沙拉", price: 90, imgurl:"https://ali.xinshipu.cn/20160620_1/original/1466434131021.jpg"},
    {name: "烤田螺", price: 120, imgurl:"https://picdn.gomaji.com/uploads/stores/417/24417/83354/%E5%A5%B6%E6%B2%B9%E8%92%9C%E5%91%B3%E7%84%97%E7%83%A4%E7%94%B0%E8%9E%BA.jpg"}, 
  ],
  Main:[
    {name: "義大利麵", price: 200, imgurl:"https://images.chinatimes.com/newsphoto/2019-01-29/900/20190129004836.jpg"},
    {name: "披薩", price: 210, imgurl:"https://elfistraveldiary.files.wordpress.com/2016/08/salami-copy.jpg"}, 
  ],
  Dessert:[
    {name: "起司蛋糕", price: 80, imgurl:"https://www.onceuponachef.com/images/2017/12/NY-Cheesecake.jpg"},
    {name: "烤布丁", price: 85, imgurl:"https://i.ytimg.com/vi/0geDq6C8mL8/maxresdefault.jpg"}, 
  ],
  Drink:[
    {name: "咖啡", price: 110, imgurl:"https://cw1.tw/CW/images/article/C1386386999309.jpg"},
    {name: "奶茶", price: 90, imgurl:"https://previews.123rf.com/images/serezniy/serezniy1807/serezniy180714435/105098221-porcelain-cup-of-tea-with-milk-isolated-on-white-background.jpg"}, 
  ],
};

var menu_item ={Starter:"開胃菜", Main:"主菜", Dessert:"甜點", Drink:"飲品"}

var kind_html = "<h2 class='foods'>{{kind}}</h2>"

var food_html = `
  <li id={{id}} class="food"><img src="{{imgurl}}"/>
    <div class="price">{{price}}</div>
    <div class="name">{{name}}</div>
  </li>
`;
var item_html = `
  <li id={{id}} class="buy_item">{{num}}.{{item}}
    <div class="price">{{price}}</div>
    <div class="number">x{{number}}</div>
    <div class="del_btn">X</div>
  </li>
` ;
var total_html = `
  <li class="buy_item total">總價
    <div class="price">{{price}}</div>
  </li>
  <div class="button">
    <div class="btn cls_btn">清除</div>
    <div class="btn check_btn">結帳</div>
  </div>
`;

$("#menu_list").html("")
var keys = Object.keys(shoplist.menu)
for(var i=0; i < keys.length; i++ ){
  $("#menu_list").append("<ul>")
  var current_kind_html = kind_html.replace("{{kind}}", menu_item[keys[i]] )
  $("#menu_list ul:nth("+i+")").append(current_kind_html)
  var foods = shoplist.menu[keys[i]]
  for(var j=0; j < foods.length; j++){
    var current_food_html = food_html.replace("{{id}}", "food_"+i+j).replace("{{imgurl}}", foods[j].imgurl).replace("{{price}}", foods[j].price).replace("{{name}}", foods[j].name)
    $("#menu_list ul:nth("+i+")").append(current_food_html)
    $("#food_"+i+j).click(function(){
      var name = $(this).children(".name").text()
      var isExist = false
      for (k=0; k < shoplist.list.length; k++){
        if(shoplist.list[k].name == name){
          shoplist.list[k].number +=1
          isExist = true
        } 
      }
      if(!isExist){
        shoplist.list.push({
          name: $(this).children(".name").text(),
          price: $(this).children(".price").text(),
          number: 1,
        })
      };
      showlist();
    })
  }
}

function showlist(){
  $("#items_list").html("")
  var total_price = 0;
  for(var i =0; i<shoplist.list.length; i++){
    let item = shoplist.list[i];
    var item_id = "buyitem_"+i;
    var sub_price = parseInt(item.price*item.number); 
    total_price += sub_price;
    var current_item_html = item_html.replace("{{id}}", item_id).replace("{{num}}", i+1).replace("{{item}}", item.name).replace("{{price}}", sub_price).replace("{{number}}", item.number);
    $("#items_list").append(current_item_html);
    // delbtn id buyitem_i
    $("#"+item_id+" .del_btn").click(function(){
      remove_item($(this).parent().attr("id").split("_")[1]);
    })
  }
  var current_total_html =total_html.replace("{{price}}", total_price);
  $("#items_list").append(current_total_html);
  $(".cls_btn").click(function(){
    shoplist.list = [];
    showlist();
  })
  $(".check_btn").click(function(){
    $("#check_box").css("display", "block");
     $("#check_box .text").text("總共金額為"+total_price+"元")
  })
}
showlist();

function remove_item(id){
  shoplist.list.splice(id, 1);
  showlist();
}

$(".ok_btn").click(function(){
    $("#check_box").css("display", "none");
    shoplist.list = [];
    showlist();
  })