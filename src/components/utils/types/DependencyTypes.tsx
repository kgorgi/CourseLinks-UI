class DependencyTypes {
    public preReq: boolean;
    public coReq: boolean;
    public precoReq: boolean;

    constructor(preReq: boolean, coReq: boolean, precoReq: boolean) {
        this.preReq = preReq;
        this.coReq = coReq;
        this.precoReq = precoReq;
    }

    getCount = () => {
        let count = 0;
        if (this.preReq) {
            count += 1;
        }

        if (this.coReq) {
            count += 1;
        }

        if (this.precoReq) {
            count += 1;
        }

        return count;
    }

    createCopy = () => {
        const { preReq, coReq, precoReq } = this;
        return new DependencyTypes(preReq, coReq, precoReq);
    }
}

export default DependencyTypes;