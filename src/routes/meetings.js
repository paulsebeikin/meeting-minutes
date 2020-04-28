const {	showMeeting, getMeeting, addMeeting, getMeetings, newMeeting } = require('../controllers/meetings')
const { newMeetingItem, createMeetingItem, showMeetingItem, getMeetingItem, updateMeetingItem } = require('../controllers/meetingItems')

const router = require('express').Router()

router.param('meeting', getMeeting)
router.get('/new', newMeeting)
router.get('/', getMeetings)
router.get('/:meeting', showMeeting)

router.post('/', addMeeting)

router.param('meetingItem', getMeetingItem)
router.get('/:meeting/meetingitems/new', newMeetingItem)
router.get('/:meeting/meetingitems/:meetingItem/edit', showMeetingItem)
router.put('/:meeting/meetingitems/:meetingItem', updateMeetingItem)
router.post('/:meeting/meetingitems', createMeetingItem)

module.exports = router
