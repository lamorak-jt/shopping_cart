var updateItemTotal = function (item) {
  var itemQty = parseFloat($(item).find('.input-quantity').val());
  if (Number.isNaN(itemQty)) {
    itemQty = 0;
  }
  
  var itemPrice = parseFloat($(item).find('.price').html());
 
  var itemTotal = itemQty * itemPrice;

  $(item).children('.total').html(itemTotal.toLocaleString('en-US'));

  return itemTotal;
}

var total = function (acc, x) { return acc + x; };

var updateCartTotal = function () {  
  var itemTotals = [];

  $('tbody tr').each(function (i, item) {
    var itemTotal = updateItemTotal(item);
    itemTotals.push(itemTotal);
    });
  
  if (itemTotals.length < 1) {
    cartTotal = 0;
  } else {
    var cartTotal = itemTotals.reduce(total);
  }

  if (Number.isNaN(cartTotal)) {
    cartTotal = 0;
  }
  
  $('.cart-total').html('$ ' + cartTotal.toLocaleString('en-US'));
  
}

$(document).ready(function () {
  updateCartTotal();

  $(document).on('click', '.btn-remove', function (event) {
    $(this).closest('tr').remove();
    updateCartTotal();
  });

  var timeout;
  $(document).on('input', 'tr td input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateCartTotal();
    }, 1000);
  });

  $('.btn-add').on('click', function (event) {
    event.preventDefault();   
    
    var item = $('input[id=new-item-name]').val();

    if (item.length < 1){
      return;
    }
    
    var price = $('input[id=new-item-price]').val(); 

    if (price.length < 1) {
      return;
    }
    
    $('tbody').append('<tr>' +
      '<td class="item">' + item + '</td>' +
      '<td class="price">' + price + '</td>' +
      '<td class="quantity"><input class="input-quantity" placeholder="Enter quantity" type="number" value=""/></td>' + '<td class="total"></td>' + '<td><button class="btn btn-light btn-sm btn-remove">Remove</button></td>' +
    '</tr>');

    updateCartTotal();

    $('input[id=new-item-name]').val('');
    $('input[id=new-item-price]').val('');

  });
});
