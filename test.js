function Animal(){
  this.name = 'animal'
  this.print = function() {
    console.log(this)
  }
}

var Person = Animal.bind(this);

var p = new Person();

p.print();