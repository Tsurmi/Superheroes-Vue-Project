var title = "Villains: Taking down the Good Guys!"
var appUrl = "/api"
var app = new Vue({
  el: "#app",
  data: {
    title: title,
    villains: undefined,
    postTitle: "Create a Villain",
    name: undefined,
    evilPower: undefined,
    img: undefined
  },
  created: function(){
    this.fetchData();
  },
  methods: {
    fetchData: function(){
      var self = this;
      $.ajax({
        method: "GET",
        url: "/api/villains"
      }).done(function(response){
        console.log(response);
        self.villains = response.data;
        console.log("received villains")
      });
    },
    postHero: function(){
      var self = this;
      var newVillan = {
        name: this.name,
        evilPower: this.evilPower,
        img: this.img
      }
      console.log("newVillan");
      $.ajax({
        url:'api/villains',
        method:'POST',
        data: newVillan
      }).done(function(response){
        console.log(response);
        console.log(response.data, "Villain Created");
      });
    },
    deleteHero: function(_id){
      console.log('Deleting hero', _id);
      var self = this;
      $.ajax({
        method: "DELETE",
        url: "/api/villains"+_id
      }).done(function(response){
        console.log(response);
      });
    }
  }
});
