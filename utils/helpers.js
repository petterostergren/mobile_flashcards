import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

export function numberOfCards(questions) {
  const numOfCards = questions.length
  const uiNumOfCards =
    numOfCards === 1 ? numOfCards + ' Card' : numOfCards + ' Cards'
  return uiNumOfCards
}

const NOTIFICATION_KEY = 'UdacityFlashcards:LocalNotification'

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  )
}

const createNotification = () => ({
    title: 'Flashcards',
    body: 'Remember that practising is the best way to learn',
    android: {
      sound: true,
      priority: 'low',
      sticky: false,
      vibrate: true,
    },
})

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day',
            })

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
}

export function getNotifications() {
  return AsyncStorage.getItem(NOTIFICATION_KEY).then(data => JSON.parse(data))
}

// Generate id for decks
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
