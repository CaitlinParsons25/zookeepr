const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers.json");

jest.mock('fs');

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Darlene", id: "jhgdja3ng2"},
        zookeepers
    );
    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Erica",
            age: 25,
            favoriteAnimal: "penguin"
        },
        {
            id: "4",
            name: "Noel",
            age: 47,
            favoriteAnimal: "tiger"
        },
    ];

    const updatedZookeepers = filterByQuery({ name: "Erica" }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("find by id", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Erica",
            age: 25,
            favoriteAnimal: "penguin"
        },
        {
            id: "4",
            name: "Noel",
            age: 47,
            favoriteAnimal: "tiger"
        },
    ];

    const result = findById("3", startingZookeepers);

    expect(result.name).toBe("Erica");
});

test("validates favorite animal", () => {
    const zookeeper = {
        id: "3",
        name: "Erica",
        age: 25,
        favoriteAnimal: "penguin"
    };

    const invalidZookeeper = {
        id: "3",
        name: "Erica",
        age: 25,
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});