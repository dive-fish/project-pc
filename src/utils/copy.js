export function copyText(text) {
  try {
    navigator.clipboard.writeText(text);
    $message.showMessage("copy.copySuccess");
  } catch (error) {
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    $message.showMessage("copy.copySuccess");
  }
}
