// abstract classes in TS are classes that cannot be instantiated on their own and must be subclassed by other classes. Abstract classes provide a blueprint for other classes and can have abstract methods,
// which are methods without a body and must be overridden by the subclass.

abstract class TakePhoto {
  constructor(public cameraMode: string, public filter: string) {}

  abstract getSepia(): void;
  getReelTime(): number {
    // some calc
    return 8;
  }
}

// we directly cannot create objects with abstract class
//const user = new TakePhoto("test", "Test")

class Instagram extends TakePhoto {
  constructor(
    public cameraMode: string,
    public filter: string,
    public burst: number
  ) {
    super(cameraMode, filter);
  }

  getSepia(): void {
    console.log("Sepia");
  }
}

const user = new Instagram("test", "Test", 3);
console.log(user.getReelTime());
