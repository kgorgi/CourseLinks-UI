class IdNameMap {
    private idLookup: Map<string, number> = new Map<string, number>();
    private nameLookup: Map<number, string> = new Map<number, string>();

    public set = (name: string, id: number) => {
        if (this.has(name) && this.has(id)) {
            return false;
            
        }
        
        this.idLookup.set(name, id);
        this.nameLookup.set(id, name);
        
        return true;
    }

    public delete = (value: string | number) => {
        if (!this.has(value)) {
            let id;
            let name;
            
            if (typeof value === "string") {
                name = value;
                id = this.idLookup.get(value);
            } else {
                name = this.nameLookup.get(value);
                id = value;
            }

            if (!id || !name) {
                return false;
            }

            return this.nameLookup.delete(id) && this.idLookup.delete(name);
        } else {
            return false;
        }
    }

    public has = (value: string | number) => {
        if (typeof value === "string") {
            const id = this.idLookup.get(value);
            return id && this.nameLookup.has(id);

        } else {
            const name = this.nameLookup.get(value);
            return name && this.idLookup.has(name);
        }
    }

    public getId = (name: string) => {
        return this.idLookup.get(name);
    }

    public getName = (id: number) => {
        return this.nameLookup.get(id);
    }
    
    public getAllNames = () => {
        return Array.from(this.idLookup.keys());
    }

    public getAllIds = () => {
        return Array.from(this.nameLookup.keys());
    }

    public clear = () => {
        this.idLookup = new Map<string, number>();
        this.nameLookup = new Map<number, string>();
    }
}

export default IdNameMap;