"use strict";

var CharacterConfig = {
  MAX_LVL: 150,
  MAX_HEALTH: 15000,
  MAX_MANA: 5000,
  MAX_STAMINA: 1000,
  EXP_PER_LEVEL: [0]
};

var expIncrement = 100;
var incrementator = 100;

for (var i = 1; i < CharacterConfig.MAX_LVL; i++)
{
  CharacterConfig.EXP_PER_LEVEL.push(expIncrement);

  if ((i + 1) % 50 === 0)
    incrementator += 50;

  expIncrement += incrementator;
}

CharacterConfig = Object.freeze(CharacterConfig);

var Character = function (options)
{
  var _name = "";
  var _health = 10;
  var _exp = 0;
  var _lvl = 0;
  var _mana = 0;
  var _stamina = 10;

  this.getName = function ()
  {
    return _name;
  };
  this.setName = function (name = "")
  {
    if (name !== "")
      _name = name;
    else
      console.error("setName -> incorrect argument data");
  };


  this.getHealth = function ()
  {
    return _health;
  };
  this.setHealth = function (health = 0)
  {
    if (health >= 0)
      _health = health;
    else
      console.error("setHealth -> incorrect argument data");    
  };
  this.addHealth = function (health = 0)
  {
    if(_health + health > CharacterConfig.MAX_HEALTH)
      _health = CharacterConfig.MAX_HEALTH;
    else if (health >= 0)
      _health += health;
    else
      console.error("addHealth -> incorrect argument data");    
  };


  this.getExp = function ()
  {
    return _exp;
  };
  this.setExp = function (exp = 0)
  {
    if (exp >= 0)
      _exp = exp;
    else
      console.error("setExp -> incorrect argument data");    
  };
  this.addExp = function (exp = 0)
  {
    var maxExp = CharacterConfig.EXP_PER_LEVEL[CharacterConfig.EXP_PER_LEVEL.length - 1];
    
    if(_exp + exp > maxExp)
      _exp = maxExp;
    else if (exp >= 0)
      _exp += exp;
    else
      console.error("addExp -> incorrect argument data");

    _lvlUp();
  };


  this.getLvl = function () {
    return _lvl;
  };
  this.setLvl = function (lvl = 0)
  {
    if(lvl <= CharacterConfig.MAX_LVL)
      _lvl = lvl;
    else if (lvl >= 0)
      _lvl = lvl;
    else
      console.error("setLvl -> incorrect argument data");    
  };
  var _lvlUp = function ()
  {
    var expRequired = CharacterConfig.EXP_PER_LEVEL[_lvl];

    if (_exp >= expRequired)
    {
      if (_lvl + 1 < CharacterConfig.MAX_LVL)
      {
        _lvl++;
        _lvlUp();
      }
    }
  };


  this.getMana = function () {
    return _mana;
  };
  this.setMana = function (mana = 0)
  {
    if(mana <= CharacterConfig.MAX_MANA)
      _mana = mana;
    else if (mana >= 0)
      _mana = mana;
    else
      console.error("setMana -> incorrect argument data");    
  };
  this.addMana = function (mana = 0)
  {
    if(_mana + mana > CharacterConfig.MAX_MANA)
      _mana = CharacterConfig.MAX_MANA;
    else if (mana >= 0)
      _mana += mana;
    else
      console.error("addMana -> incorrect argument data");    
  };


  this.getStamina = function () {
    return _stamina;
  };
  this.setStamina = function (stamina = 0)
  {
    if(stamina <= CharacterConfig.MAX_STAMINA)
      _stamina = stamina;
    else if (stamina >= 0)
      _stamina = stamina;
    else
      console.error("setStamina -> incorrect argument data");    
  };
  this.addStamina = function (stamina = 0)
  {
    if(_stamina + stamina >= CharacterConfig.MAX_STAMINA)
      _stamina = CharacterConfig.MAX_STAMINA;
    else if (stamina >= 0)
      _stamina += stamina;
    else
      console.error("addStamina -> incorrect argument data");    
  };


  this.setName(options.name);
  this.setHealth(options.health);
  this.setExp(options.exp);
  this.setLvl(options.lvl);
  this.setMana(options.mana);
  this.addStamina(options.stamina);
};


var Undead = function(options)
{
  Character.apply(this, arguments);

  var _powerUndead = 0;

  this.getPowerUndead = function ()
  {
    return _powerUndead;
  };

  this.setPowerUndead = function (powerUndead = 0)
  {
    if (powerUndead >= 0) 
    {
      _powerUndead = powerUndead;
    }
  };

  Undead.prototype = Object.create(Character.prototype);

  this.setPowerUndead(options.powerUndead);
}

var artes = new Undead({health:5000, name:'Artes', mana:10000, stamina: 5000, powerUndead: 777});

console.log(artes.getPowerUndead());