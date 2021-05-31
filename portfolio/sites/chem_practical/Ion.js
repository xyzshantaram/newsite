class Ion {
    constructor(name, compatible, charge) {
        this.compatible = compatible;
        this.charge = charge;
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getCompatible() {
        return this.compatible;
    }

}