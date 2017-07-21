var title = "SUPER VILLAINS"
var appUrl = "/api"
var app = new Vue({
  el: "#app",
  data: {
    title: title,
    villains: undefined,
    heroes: undefined,
    villainsSize: 0,
    heroesSize: 0,
    postTitle: "Create a Villain",
    name: undefined,
    evilPower: undefined,
    img: undefined
  },
  created: function(){
    this.fetchData();
    this.fetchHeroes();
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
        console.log("received villains", self.villains);
        self.villainsSize = self.villains.length;
      });
    },
    fetchHeroes: function(){
      var self = this;
      $.ajax({
        method: "GET",
        url: "/api/heroes"
      }).done(function(response){
        self.heroes = response.data;
        console.log("received heroes", self.heroes);
        console.log("received heroes")
        self.heroesSize = self.heroes.length;
        (self.heroesSize > self.villainsSize) ? self.heroes.splice(self.villainsSize, self.heroesSize - self.villainsSize) : self.villains.splice(self.heroesSize, self.villainsSize - self.heroesSize);
        console.log("heroes", self.heroes, "villains", self.villains);
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
