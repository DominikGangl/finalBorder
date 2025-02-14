//@ts-nocheck
let _remoteValue = 0;

export function getRemoteValue() {
  return _remoteValue;
}

export function setRemoteValue(val) {
  _remoteValue = val;
}
