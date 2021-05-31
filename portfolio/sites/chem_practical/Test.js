class Test {
    constructor(name, procedure, results) {
        this.name = name;
        this.procedure = procedure;
        this.results = results;
    }

    checkIon(ion) {
        return (Object.keys(this.results).includes(ion.name));
    }

    getObservation(ion) {
        return this.results[ion.name];
    }
}