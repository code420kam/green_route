import express from 'express'
import UserCtrl from './controller'

export default express.Router().post('/create', UserCtrl.create).get('/user', UserCtrl.userLogin)
