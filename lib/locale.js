export async function extractLocale(props) {
  const params = await props.params;
  return params?.locale || "en";
}
