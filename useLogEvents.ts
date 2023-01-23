import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import FirebaseAnalytics from '@react-native-firebase/analytics'
import PushWoosh from 'pushwoosh-react-native-plugin'

import { selectCognitoUser } from '~root/redux/user'
import { ICognitoUser } from '~root/types'
import useDeviceInfo from './useDeviceInfo'
import { useLogTags } from './useLogTags'
export interface ILogEventsOpts {
  firebase: boolean
  pushwoosh: boolean
}
export const useLogEvents = () => {
  const { logTags } = useLogTags()
  const cognitoUser: ICognitoUser | null = useSelector(selectCognitoUser)
  const { deviceName, country } = useDeviceInfo()
  const logEvent = useCallback(
    async (
      evName: string,
      evData?: Record<string, any>,
      opts: ILogEventsOpts = { firebase: true, pushwoosh: true },
    ) => {
      const data: Record<string, any> = {
        ...(evData || {}),
        eventName: evName,
        deviceName,
        location: country,
        timestamp: `${new Date()}`,
      }
      const email = evData?.email || cognitoUser?.email
      const userId = evData?.userId || cognitoUser?.id
      if (email) {
        data.email = email
      }
      if (userId) {
        data.userId = userId
      }
      console.log({ logEvent: data, opts })
      if (opts.firebase && userId) await FirebaseAnalytics().setUserId(userId)
      if (opts.pushwoosh && userId) PushWoosh.setUserId(userId)
      if (opts.firebase) await FirebaseAnalytics().logEvent(evName, data)
      if (opts.pushwoosh) {
        PushWoosh.postEvent(evName, data)
        const matches = evName.match(/log_|reminder_set|reminder_fire|snooze_set/g)
        if (matches?.length) {
          const tagName = matches[0].split('_')[0]
          const TAG = tagName.charAt(0).toUpperCase() + tagName.slice(1)
          logTags(TAG, evName)
        }
      }
    },
    [deviceName, country, cognitoUser, logTags],
  )
  return { logEvent }
}
export default useLogEvents
