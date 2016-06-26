$("#abort").click(function () {
                console.log("abort wird weqrf");
                window.location.href = "/";

            });

            $("#saveArticle").click(function () {
                var name = $("#nameInput").val();
                var descr = $("#descrInput").val();
                var price = $("#priceInput").val();
                var storage = $("#storageInput").val();

                if (name == '') {
                    $('#nameInput').css("border", "2px solid red");
                    $('#nameInput').css("box-shadow", "0 0 3px red");
                }
                if (descr == '') {
                    $('#descrInput').css("border", "2px solid red");
                    $('#descrInput').css("box-shadow", "0 0 3px red");
                }
                if (price == '') {
                    $('#priceInput').css("border", "2px solid red");
                    $('#priceInput').css("box-shadow", "0 0 3px red");
                }
                if (storage == '') {
                    $('#storageInput').css("border", "2px solid red");
                    $('#storageInput').css("box-shadow", "0 0 3px red");
                }
                $.post("/article", {

                        name: name,
                        descr: descr,
                        price: price,
                        storage: storage
                    },
                    function (data) {
                        if (data == 'Fail') {
                            $('#nameInput').css("border", "2px solid red");
                            $('#nameInput').css("box-shadow", "0 0 3px red");
                            //$('#nameInput').after('<p class="user">Artikel hinzufügen nicht erfolgreich!</p>');
                            BootstrapDialog.show({
                                message: 'Artikle konnte nicht hinzugefügt werden!'
                                , title: 'Artikel'
                                , type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                                closable: true, // <-- Default value is false
                                draggable: true, // <-- Default value is false
                                buttons: [{
                                    label: 'OK'
                                    , action: function (dialogItself) {
                                        dialogItself.close();
                                    }
                               }]
                            });
                        } else {
                            $('#nameInput').after('<p class="signup">Artikel hinzufügen erfolgreich!</p>');
                            window.location.href = "/";
                        }
                    });
            });