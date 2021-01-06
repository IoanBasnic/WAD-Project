var clicked_id = [];
function loadProducts() {

  //  console.log("its working");
    var xhttp = new XMLHttpRequest();
    var xhttp2 = new XMLHttpRequest();
    var xhttp3 = new XMLHttpRequest();
    var getCUrrentUser = "uno";

    xhttp2.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200)
        {
            console.log("hi");
            var result = this.responseText;

            var results = JSON.parse(result);


                getCUrrentUser = results.user_name;

        }
    }


    var add_button_category;
    var delete_button_category;
    var edit_button_category;
    var categories;
    xhttp3.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200)
        {
            console.log("hi");
            var result = this.responseText;

            var results = JSON.parse(result);
            console.log(result);
            results.forEach((categories) => {
                console.log(categories);
                var anch = document.createElement("a");
                anch.onclick = function onclickFunctionBuy() {

                    console.log(categories.category);

                    //var childDivs = document.getElementById('pro').getElementsByTagName('div');
                    var childDivs = document.getElementsByClassName('column-Market');
                    console.log("Aici am clasele");
                    console.log(document.getElementsByClassName('column-Market'));
                    for( i=0; i< childDivs.length; i++ )
                    {
                        var childDiv = childDivs[i];
                        //console.log(childDiv.className);
                        //document.getElementsByName()
                        //document.getElementsByClassName(childDiv.className)[0].style.display = "inline";

                        var divsToHide = document.getElementsByClassName(childDiv.className); //divsToHide is an array

                        if(divsToHide.length > 1)
                        for(var j = 0; j < divsToHide.length; j++){
                            divsToHide[j].style.display = "inline"; // depending on what you're doing
                        }

                        else
                        document.getElementsByClassName(childDiv.className)[0].style.display = "inline";


                        if(childDiv.id != categories.category)
                        {

                          //  var divsToHide = document.getElementsByClassName(childDiv.className); //divsToHide is an array


                         //   document.getElementsByClassName(childDiv.className)[0].style.display = "none";
                         //
                            console.log(divsToHide);
                            if(divsToHide.length > 1)
                            for(var j = 0; j < divsToHide.length; j++){
                                console.log(j);
                                divsToHide[j].style.display = "none";
                            }

                         else
                            {
                                document.getElementsByClassName(childDiv.className)[0].style.display = "none";
                            }


                         //   document.getElementsByClassName(childDiv.className)[0].style.display = "none";
                         //   document.getElementsByClassName(childDiv.className)[0].style.display = "none";
                        }
                    }

                   // document.getElementById(categories.category).style.display = "none";
                };
                var text_category = document.createTextNode(categories.category);
                anch.appendChild(text_category);
                document.getElementById('Product_type').appendChild(anch);

                if(getCUrrentUser.localeCompare("admin") == 0)
                {
                    add_button_category = document.createElement("button");
                    add_button_category.append("Add category");
                    add_button_category.onclick = function onclickFunctionBuy() {

                        // alert(product.id);
                        document.getElementById('idAddCategory').style.display='block';


                        //   alert(document.getElementById('buyprd').name);
                    };

                    delete_button_category = document.createElement("button");
                    delete_button_category.append("Delete category");
                    delete_button_category.onclick = function onclickFunctionBuy() {

                        // alert(product.id);
                        document.getElementById('idDeleteCategory').style.display='block';


                        //   alert(document.getElementById('buyprd').name);
                    };

                    edit_button_category = document.createElement("button");
                    edit_button_category.append("Edit category");
                    edit_button_category.onclick = function onclickFunctionBuy() {

                        // alert(product.id);
                        document.getElementById('idEditCategory').style.display='block';

                        //   alert(document.getElementById('buyprd').name);
                    };

                }
            });
            if(getCUrrentUser.localeCompare("admin") == 0)
            {
                document.getElementById('Product_type').appendChild(add_button_category);
                document.getElementById('Product_type').appendChild(edit_button_category);
                document.getElementById('Product_type').appendChild(delete_button_category);
            }
            //document.getElementById('Product_type').appendChild(add_button_category);
        }
    }

    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200)
        {
            var result = this.responseText;

            var results = JSON.parse(result);

            results.forEach((product) => {
                var node = document.createElement("div");
                var img =  document.createElement("img");
                var title = document.createElement("H3");
                var desc = document.createElement("p");
                var price = document.createElement("p");

                node.id = product.category;

                var delbtn = document.createElement('button');
                var editbtn = document.createElement('button');
                var buybtn = document.createElement('button');

                var catg = document.createElement("p");

                catg.append("Category: "+ product.category);
                delbtn.append("Delete product");
                editbtn.append("Edit product");
                buybtn.append("Buy product");

                delbtn.name = product.id;
                editbtn.name = getCUrrentUser;

                clicked_id = product.id;

                delbtn.onclick = function onclickFunctionDel() {

                   // alert(product.id);
                    document.getElementById('idDel').style.display='block';
                    document.getElementById('delchange').name = product.id;

                   // alert(document.getElementById('delchange').name);
                };
                editbtn.onclick = function onclickFunctionEdit () {

                    // alert(product.id);
                    document.getElementById('idEdit').style.display='block';
                      document.getElementById('editchange').name = product.id;

                  //   alert(document.getElementById('editchange').name);
                };

                buybtn.onclick = function onclickFunctionBuy() {

                    // alert(product.id);
                    document.getElementById('idBuy').style.display='block';
                    document.getElementById('buyprd').name = product.id;

                  //   alert(document.getElementById('buyprd').name);
                };
                //   delbtn += '<button onclick="document.getElementById(\'id03\').style.display=\'none\'">Delete product</button>';

             //   editbtn.onclick.arguments = 'editFunction()';
             //   buybtn.onclick.arguments = 'buyFunction()';
                node.className = 'column-Market' + " " + product.category;

               // img.append('src="' + product.img + '"');
                img.src =  'uploads\\' + product.img;
               // var textImg = document.createTextNode('uploads/' + product.img);
               // var textTitle = document.createTextNode('Title:' + product.pname);
               // var textDesc = document.createTextNode('Description: ' + product.desc);
                var textPrice = document.createTextNode('Price: ' + product.price + " lei");
                var textTitle = document.innerHTML = 'Title:' + product.pname;
                var textDesc = document.innerHTML = 'Description: ' + product.desc;
               // img.appendChild(textImg);
                title.insertAdjacentHTML('beforeend', textTitle);
                desc.insertAdjacentHTML('beforeend', textDesc);
                price.appendChild(textPrice);

                node.appendChild(img);
                node.appendChild(title);
                node.appendChild(desc);
                node.appendChild(price);
                node.appendChild(catg);
                var admin = "admin";
                var users = product.user;
                console.log(getCUrrentUser.localeCompare(admin) + "\n" + product.user.localeCompare(getCUrrentUser));
                console.log(getCUrrentUser);

                if(getCUrrentUser.localeCompare(admin) == 0)
                {

                    node.appendChild(delbtn);
                    node.appendChild(editbtn);
                    node.appendChild(buybtn);
                }

                else if(users.localeCompare(getCUrrentUser) == 0)
                {
                    node.appendChild(delbtn);
                    node.appendChild(editbtn);

                }

                else
                {
                    node.appendChild(buybtn);
                }


                document.getElementById('pro').appendChild(node);




            });
        }
    }

    xhttp.open("GET", "/products", true);
    xhttp.send();

    xhttp2.open("GET", "/getCurrentUser", true);
    xhttp2.send();

    xhttp3.open("GET", "/getCategories", true);
    xhttp3.send();

}

