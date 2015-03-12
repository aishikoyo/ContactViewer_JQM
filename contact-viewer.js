var _apiKey='admin';
var _contacts = {};
var _contactId = null;

console.log("Loading");
$(document).on("pagebeforeshow","#home-page", function(){
  var contactList = $('#contact-list');
  contactList.html('');

  $.get(
    'http://contacts.tinyapollo.com/contacts?key='+_apiKey,
      function(result) {
        _contacts = {};
        //console.log("there are "+ result.contacts.length + " contacts");
          for (i in result.contacts) {
              var contact = result.contacts[i];
              _contacts[contact._id] = contact;
              contactList.append('<li><a href="#details-page" ' +
                'data-contact-id="' +
                contact._id + '">' +
                contact.name + '</a></li>')
          }
          contactList.listview('refresh');
      }
  )
});

$(document).on('click', '#contact-list a', function() {
  //jquery binds $(this) to origin of event in DOM
  //(i.e. the link that was clicked)
  var link = $(this);

  //access the data-contact-id defined in the link
  _contactId = link.data('contact-id');
  console.log('contact id is ' + _contactId);
  return true;
})

$(document).on('pagebeforeshow','#details-page',function() {
  var contact = _contacts[_contactId]
  $('.contact-name').text(contact.name)
  $('.contact-title').text(contact.title)
  $('.contact-email').text(contact.email)
  $('.contact-phone').text(contact.phone)
  $('.contact-twitterid').text(contact.twitterId)
})

$(document).on('pagebeforeshow','#new-page',function() {
	$.get(
    'http://contacts.tinyapollo.com/contacts?key='+_apiKey,
      function(result) {
        _contacts = {};
        //console.log("there are "+ result.contacts.length + " contacts");
          for (i in result.contacts) {
              var contact = result.contacts[i];
              _contacts[contact._id] = contact;
              contactList.append('<li><a href="#details-page" ' +
                'data-contact-id="' +
                contact._id + '">' +
                contact.name + '</a></li>')
          }
          contactList.listview('refresh');
      }
  )
})