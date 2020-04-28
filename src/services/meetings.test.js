const meetingsDb = require('./meetings')

describe('Meetings', () => {
    it('should fail to add a meeting', () => {
        expect.assertions(1)
        return meetingsDb.create({            
                date: new Date(),
                number: 'F3'            
        }).catch(err => {
            expect(err.name).toBe('SequelizeDatabaseError')                       
        })
    })

    it('should fail so as to enforce unique meeting numbers', () => {
        expect.assertions(1)
        return meetingsDb.create(
            {
                date: new Date(),
                number: 'M2', // already added by the seed
                meetingTypeId: 1
            }
        ).catch(err => {
            expect(err.name).toBe('SequelizeUniqueConstraintError')                       
        })
    })

    it('should succeed in adding a new item', () =>{
        expect.assertions(2)
        return meetingsDb.create(
            {
                date: new Date(),
                number: 'M3', // already added by the seed
                meetingTypeId: 1
            }
        ).then(response => {
            expect(response).toBeTruthy();
            expect(response.id).toBeTruthy()
        })
    })
})