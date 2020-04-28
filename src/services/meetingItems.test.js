const meetingItemsDb = require('./meetingItems')

describe('MeetingItems', () => {
    it('should succeed', () => {
        expect.assertions(1)
        return meetingItemsDb.createNewMeetingItem({
            statusId: 1,
            item: {
                name: 'Google Forms'
            },
            responsiblePerson: 'Joe Soap',
            comment: 'Urgent!!!',
            meetingId: 1,           
        }).then(response => {
            expect(response).toBeTruthy()
        })
    })

    it('should fail if field is missing', () => {
        expect.assertions(1)
        return meetingItemsDb.createNewMeetingItem({
            statusId: 1,
            item: {
                name: 'Google Forms'
            },            
            comment: 'Urgent!!!',
            meetingId: 1,           
        }).catch(err => {
            expect(err.name).toBe('SequelizeValidationError')
        })
    })

    it('should fail if field is supplied but left blank', () => {
        expect.assertions(1)
        return meetingItemsDb.createNewMeetingItem({
            statusId: 1,
            item: {
                name: 'Google Forms'
            },            
            comment: 'Urgent!!!',
            responsiblePerson: '',
            meetingId: 1,           
        }).catch(err => {
            expect(err.name).toBe('SequelizeValidationError')
        })
    })

    it('should fail if attempt to assign to invalid meeting', () => {
        expect.assertions(1)
        return meetingItemsDb.createNewMeetingItem({
            statusId: 1,
            item: {
                name: 'Google Forms'
            },            
            comment: 'Urgent!!!',
            responsiblePerson: '',
            meetingId: 999,           
        }).catch(err => {
            expect(err.name).toBe('SequelizeValidationError')
        })
    })
})