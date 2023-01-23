import { useState, useEffect } from 'react'
import DeviceInfo from 'react-native-device-info'
import * as RNLocalize from 'react-native-localize'

import { IDeviceInfo } from '~types/index'

export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<IDeviceInfo>({
    buildId: '',
    brand: '',
    buildNumber: '',
    deviceId: '',
    deviceType: '',
    deviceName: '',
    manufacturer: '',
    systemName: '',
    systemVersion: '',
    appVersion: '',
    country: '',
  })

  useEffect(() => {
    const getDeviceInfo = async () => {
      let _buildId = ''
      let _brand = ''
      let _buildNumber = ''
      let _deviceId = ''
      let _deviceType = ''
      let _deviceName = ''
      let _manufacturer = ''
      let _systemName = ''
      let _systemVersion = ''
      let _appVersion = ''
      let _country = ''

      await Promise.all([
        (_buildId = await DeviceInfo.getBuildId()),
        (_brand = await DeviceInfo.getBrand()),
        (_buildNumber = await DeviceInfo.getBuildNumber()),
        (_deviceId = await DeviceInfo.getDeviceId()),
        (_deviceType = await DeviceInfo.getDeviceType()),
        (_deviceName = await DeviceInfo.getDeviceName()),
        (_manufacturer = await DeviceInfo.getManufacturer()),
        (_systemName = await DeviceInfo.getSystemName()),
        (_systemVersion = await DeviceInfo.getSystemVersion()),
        (_appVersion = await DeviceInfo.getVersion()),
        (_country = RNLocalize.getCountry()),
      ])

      setDeviceInfo({
        buildId: _buildId,
        brand: _brand,
        buildNumber: _buildNumber,
        deviceId: _deviceId,
        deviceType: _deviceType,
        deviceName: _deviceName,
        manufacturer: _manufacturer,
        systemName: _systemName,
        systemVersion: _systemVersion,
        appVersion: _appVersion,
        country: _country,
      })
    }
    getDeviceInfo()
  }, [])

  return deviceInfo
}

export default useDeviceInfo
