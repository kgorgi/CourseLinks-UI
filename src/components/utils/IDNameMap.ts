class IdNameMap {
    private _idLookup: Map<string, number> = new Map<string, number>();
    private _nameLookup: Map<number, string> = new Map<number, string>();

    set = (name: string, id: number) => {
        if (this.has(name) || this.has(id)) {
            return false;
        } else if (this._idLookup.has(name) || this._nameLookup.has(id)) {
            // tslint:disable-next-line:no-console
            console.error("IDNameMap: Set Internal Error");
            return false;
        }

        this._idLookup.set(name, id);
        this._nameLookup.set(id, name);
        return true;
    }

    delete = (value: string | number) => {
        if (!this.has(value)) {
            let id;
            let name;
            
            if (typeof value === "string") {
                name = value;
                id = this._idLookup.get(value);
            } else {
                name = this._nameLookup.get(value);
                id = value;
            }

            if (!id || !name) {
                return false;
            }

            return this._nameLookup.delete(id) && this._idLookup.delete(name);
        } else {
            return false;
        }
    }

    has = (value: string | number) => {
        if (typeof value === "string") {
            const id = this._idLookup.get(value);
            return id && this._nameLookup.has(id);

        } else {
            const name = this._nameLookup.get(value);
            return name && this._idLookup.has(name);
        }
    }

    getId = (name: string) => {
        return this._idLookup.get(name);
    }

    getName = (id: number) => {
        return this._nameLookup.get(id);
    }
    
    getAllNames = () => {
        return Array.from(this._idLookup.keys());
    }

    getAllIds = () => {
        return Array.from(this._nameLookup.keys());
    }

    clear = () => {
        this._idLookup = new Map<string, number>();
        this._nameLookup = new Map<number, string>();
    }
}

export default IdNameMap;