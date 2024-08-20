const app = require('../../app')
const supertest = require('supertest')
const req = supertest(app)
const Note = require("../../models/note").default

describe('Add Note', () => {
    beforeEach(async () => {
        // Clear notes before each test to ensure isolation
        await Note.deleteMany({})
    })

    it('Should add a new note and redirect to login', async () => {
        const newNote = {
            title: "[INTEGRATION TEST] New Note",
            description: "This note was created at " + new Date(),
        }

        const res = await req
            .post('/')
            .send(newNote)

        // Check redirect response
        expect(res.statusCode).toEqual(302)
        expect(res.headers['location']).toEqual('/')

        // Verify note has been added to the database
        const notes = await Note.find({ title: newNote.title })
        expect(notes.length).toBe(1)
        expect(notes[0].description).toBe(newNote.description)
    })
})
