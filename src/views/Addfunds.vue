<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-md-3">
        <p>Добавить средства на аккаунт</p>
        <form method="POST" action="https://money.yandex.ru/quickpay/confirm.xml" class="form-group">
          <input class="form-control" type="hidden" name="receiver" value="410012959112890">
          <input class="form-control" type="hidden" name="label" value="$order_id">
          <input class="form-control" type="hidden" name="quickpay-form" value="donate">
          <input class="form-control" type="hidden" name="targets" value="Пополение баланса">
          <input class="form-control" type="number" name="sum" min="0" data-type="number" placeholder="Сумма">
          <input class="form-control" type="hidden" name="paymentType" value="AC">
          <input class="form-control" type="hidden" name="successURL" value="AC">
          <input class="form-control" type="submit" value="Добавить">
        </form>
      </div>
    </div>
  </div>
</template>
