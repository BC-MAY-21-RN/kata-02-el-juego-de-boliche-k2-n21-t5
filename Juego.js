"use strict";

class Frame {
  constructor() {
    this.roll1 = null;
    this.roll2 = null;
    //this.rollExtra = null;

    this.score = 0;
  }
  get_roll1() {
    return this.roll1;
  }
  get_roll2() {
    return this.roll2;
  }
  is_spray() {
    return this.roll1 + this.roll2 === 10 ? true : false;
  }
  is_strike() {
    return this.roll1 === 10 ? true : false;
  }
  set_score(puntos) {
    this.score = puntos;
  }
  get_first_roll() {
    return Math.floor(Math.random() * 11);
  }
  get_second_roll() {
    return Math.floor(Math.random() * (11 - this.roll1));
  }

  play_fframe(){
    this.roll1 = this.get_first_roll();
    this.roll2 = this.get_first_roll();
    this.score = this.roll1 + this.roll2;
  }

  bonus_roll() {
    this.roll2 = null;
    this.score = this.roll1;
  }/*this.roll1 = Math.floor(Math.random() * 11);
  this.roll2 = Math.floor(Math.random() * (11 )); //
  this.score = this.roll1 + this.roll2;
  mas_pin(){
  }*/
  play() {
    this.roll1 = this.get_first_roll();
    this.roll2 = this.get_second_roll();
    this.score = this.roll1 + this.roll2;
  }
  sum_score(masPun) {
    this.score += masPun;
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
    //nose, estoy pensando
    for (let i = 0; i < this.initial_frames; i++) {
      let frame = new Frame();
      frame.play();

      if (i == 9) {
        if (frame.is_strike()
          || frame.is_spray()) {
            this.initial_frames += 1;
          }
      } 


      //si ya ha pasado al menos un frame en el juego y que no entre al ultimo
      if (i > 0) {
        if (this.frames[i - 1].is_strike()) {
          //ganamos frame extra si hacemos chuza en turno 10
          if (i == 10) {
            frame.play_fframe();
          }
         
          //se actualiza la puntuacion del score del las 2 tiradas del frame anterior
          this.frames[i - 1].sum_score(frame.get_roll1() + frame.get_roll2());
          //se actualiza el score final con el bonus del strike
          this.final_score = this.frames[i - 1].get_score();
        } else if (this.frames[i - 1].is_spray()) {
          
          if (i == 10) {
            frame.bonus_roll();
          }

          //se toma como bonus la tirada anterior
          this.frames[i - 1].sum_score(frame.get_roll1());

          this.final_score = this.frames[i - 1].get_score();
        }
      }

      this.final_score += frame.get_score();
      frame.set_score(this.final_score);

      this.frames.push(frame);
    }

    //aqui
    console.table(this.frames);
    console.log(this.final_score);
  }
}

let juego1 = new Game();



