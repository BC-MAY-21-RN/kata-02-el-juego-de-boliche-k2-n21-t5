"use strict";

class Frame {
  constructor() {
    this.roll1 = null;
    this.roll2 = null;
    this.score = 0;
  }
  get_roll1() {
    return this.roll1;
  }
  get_roll2() {
    return this.roll2;
  }
  is_spray() {
    //validar si en roll 1 fue chuza
    return (this.roll1 + this.roll2 === 10) ? true : false;
  }
  is_strike() {
    return (this.roll1 === 10) ? true : false;
  }
  set_score(puntos) {
    this.score = puntos;
  }
  play() {
    this.roll1 = Math.floor(Math.random() * 11);
    this.roll2 = Math.floor(Math.random() * (11 - this.roll1)); //
    this.score = this.roll1 + this.roll2;
  }
  sum_score(masPun){
    this.score = this.roll1 + masPun;
  }
  get_score() {
    return this.score;
  }
}

class Game {
  constructor() {
    this.frames = [];
    this.initial_frames = 10;
    this.final_score = 0;
    this.score();
  }

  score() {
    for (let i = 0; i < this.initial_frames; i++) {
      //creacion de la variable roll randomizada
      let frame = new Frame();
      frame.play();

      if (i > 0) {
        if (this.frames[i-1].is_spray()) {
          this.frames[i-1].sum_score(frame.get_roll1());
          console.log(this.final_score);
          this.final_score += frame.get_roll1();
        } /*else if (this.frames[i-1].is_strike()) {         
        }*/
      }
      
      
      this.final_score += frame.get_score();
      frame.set_score(this.final_score);

      this.frames.push(frame);
    }
    console.table(this.frames);
    console.log(this.final_score);
  }
}

let juego = new Game();

//SPARE= SACA 10 CON 2 INTENTOS Y SUMA EL SIGUIENTE ROL AL SCORE
//STRIKE= SACA 10 CON EL PRIMER INTENTO Y SUMA LOS 2 SIGUIENTES ROLS AL SCORE
