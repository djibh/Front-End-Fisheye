class Media {
  constructor(data) {
    this._id = data.id;
    this._photographer.id = data.photographerId;
    this._title = data.title;
    this._image = data.image;
    this._likes = data.likes;
  }

  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerId
  }

  get title() {
    return this._title
  }

  get image() {
    return this.hasOwnProperty('image') ? this['image'] : this['video']
  }

  get likes() {
    return this._likes
  }
}
