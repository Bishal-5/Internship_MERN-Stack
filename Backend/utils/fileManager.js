const fs = require('fs').promises;
const path = require('path');

class fileManager {
    constructor(dataDir = "data") {
        this.dataDir = dataDir;
    }

    async readData(fileName) {
        try {
            const filePath = path.join(this.dataDir, fileName);
            const data = await fs.readFile(filePath, "utf-8");
            return JSON.parse(data);
        }
        catch (error) {
            console.error(`Error reading file ${fileName}:`, error);
            if (error.code === "ENOENT") {
                console.error(`File not found: ${fileName}`);
                return [];
            }
            throw error;
        }
    }

    async writeData(fileName, data) {
        try {
            const filePath = path.join(this.dataDir, fileName);
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        }
        catch (error) {
            throw error;
        }
    }

    async updateData(id, fileName, updateData) {
        try {
            const data = await this.readData(fileName);
            const index = data.findIndex((item) => item.id === parseInt(id));
            if (index === -1) {
                return null;
            }
            data[index] = {
                ...data[index],
                ...updateData,
                updatedAt: new Date().toISOString(),
            };
            await this.writeData(fileName, data);
            return data[index];
        }

        catch (error) {
            throw error;

        };
    }

    async deleteData(fileName, id) {
        const data = await this.readData(fileName);
        const index = data.findIndex((item) => item.id === parseInt(id));
        if (index === -1) {
            return null;
        }
        const deletedItem = data.splice(index, 1)[0];
        await this.writeData(fileName, data);
        return deletedItem;
    }

    async appendData(fileName, newData) {
    try {
        const data = await this.readData(fileName);
        const nextId =
            data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
        newData.id = nextId;  // fixed this line
        newData.createdAt = new Date().toISOString();
        data.push(newData);
        await this.writeData(fileName, data);
        return newData;
    }
    catch (error) {
        console.error(`Error appending data to file ${fileName}:`, error);
        throw error;
    }
}

}

module.exports = new fileManager();