// DOM API for checking if the device is mobile device
const isDeviceMobile = () => {
  const isMobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(
    navigator.userAgent.toLowerCase()
  );

  return isMobile;
};

export default isDeviceMobile;
