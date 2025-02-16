document.getElementById("payButton").addEventListener("click", function () {
  const merchant_uid = document.getElementById("merchant_uid").value;
  const product_name = document.getElementById("product_name").value;
  const amount = document.getElementById("amount").value;

  if (!merchant_uid || !product_name || !amount) {
    alert("모든 필드를 입력해주세요!");
    return;
  }

  const IMP = window.IMP;
  IMP.init("imp22771671");

  IMP.request_pay(
    {
      channelKey: "channel-key-34ec0a47-8906-4322-b132-71bc08cd31db",
      pay_method: "card",
      merchant_uid,
      name: product_name,
      amount: parseInt(amount),
    },
    async (response) => {
      if (response.success) {
        alert(`결제가 성공적으로 처리되었습니다! (${response.imp_uid})`);
      } else {
        alert("결제에 실패하였습니다. 이유: " + response.error_msg);
        console.error("결제 실패:", response);
      }
    }
  );
});
