path = r'C:\CAPSTONE 2\CareConnectWeb\app\(doctor)\doctor\appointments\[id]\page.tsx'
with open(path, 'rb') as f:
    data = f.read()

# Add getJitsiUrl helper before the component
old = b'export default function DoctorAppointmentDetailPage() {'
new = (
    b'function getJitsiUrl(videoRoomUrl: string, displayName: string): string {\n'
    b'  const domain = process.env.NEXT_PUBLIC_JITSI_DOMAIN ?? "meet.jit.si";\n'
    b'  const roomName = videoRoomUrl.split("#")[0].split("/").pop() ?? videoRoomUrl;\n'
    b'  const encodedName = encodeURIComponent(displayName);\n'
    b'  return (\n'
    b'    `https://${domain}/${roomName}` +\n'
    b'    `#userInfo.displayName="${encodedName}"` +\n'
    b'    `&config.prejoinPageEnabled=false` +\n'
    b'    `&config.startWithAudioMuted=false` +\n'
    b'    `&config.startWithVideoMuted=false` +\n'
    b'    `&config.disableDeepLinking=true`\n'
    b'  );\n'
    b'}\n\n'
    b'export default function DoctorAppointmentDetailPage() {'
)
data = data.replace(old, new, 1)

# Fix the Join Video Room anchor to use getJitsiUrl
old2 = b'<a href={videoRoomUrl} target="_blank" rel="noopener noreferrer" className="block">'
new2 = b'<a href={getJitsiUrl(videoRoomUrl, user?.name ?? "Doctor")} target="_blank" rel="noopener noreferrer" className="block">'
data = data.replace(old2, new2, 1)

with open(path, 'wb') as f:
    f.write(data)

print('Done')
print('getJitsiUrl defined:', b'function getJitsiUrl' in data)
print('getJitsiUrl used in anchor:', b'getJitsiUrl(videoRoomUrl' in data)
