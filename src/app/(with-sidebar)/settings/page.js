// in settings/page.js
export default async function Settings() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate slow load

  return <div>Settings Page</div>;
}
