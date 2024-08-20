const mockingoose = require('mockingoose');
const Note = require("../../models/note")

// Unit Tests only test the validation built into Note

describe('mockingoose', () => {
    beforeEach(() => {
        mockingoose.resetAll();
        jest.clearAllMocks();
    });

    describe("Test Both Fields Are Set", () => {
        it('Validate Model', async () => {
            // Create a Note instance with valid values
            const todo = new Note({
                title: "Task Note",
                description: "This is a valid description" // Provide a valid description
            });

            const result = await todo.validateSync();
            expect(result).toBe(undefined);
        });
    })
})
