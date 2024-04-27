export default function convertPhoneToReq(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}
