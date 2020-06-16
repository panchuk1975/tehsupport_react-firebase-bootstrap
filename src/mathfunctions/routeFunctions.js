export const expendedWithoutCargo = (form) => {
  let routeTotal = 0;
  let routeInaTow = 0;
  let routeCost = 0;
  let costCoefficient = 1;
  let pavementCoefficient = 1;
  
  if (form.routeTotal !== 0) {
    routeTotal = Number(form.routeTotal);
  } else {
    routeTotal = Number(form.routeWithRoute);
  }
  if (form.routeInaTow !== 0) {
    routeInaTow = Number(form.routeInaTow);
  }
  if (form.routeCost !== 0) {
    routeCost = Number(form.routeCost);
  }
  if (form.costCoefficient !== 0) {
    costCoefficient = Number(form.costCoefficient);
  }
  if (form.typeOfPavement !== 0) {
    pavementCoefficient = Number(form.typeOfPavement);
  }
  return (
    Math.round(
      (parseInt(routeTotal) - parseInt(routeInaTow)) *
        routeCost *
        costCoefficient *
        pavementCoefficient *
        100
    ) / 100
  );
};
export const addedExpendedWithCargo = (form) => {
  let routeWithCargo = 0;
  let cargoWeight = 0;
  let costCoefficient = 1;
  if (form.routeWithCargo !== 0) {
    routeWithCargo = Number(form.routeWithCargo);
  }
  if (form.cargoWeight !== 0) {
    cargoWeight = Number(form.cargoWeight);
  }
  if (form.costCoefficient !== 0) {
    costCoefficient = Number(form.costCoefficient);
  }
  return (
    Math.round(
      costCoefficient *
        Number(form.cargoCoefficient) *
        100 *
        parseInt(routeWithCargo) *
        parseInt(cargoWeight)
    ) / 100
  );
};
export const addedExpendedWithTreiler = (form) => {
  let routeWithTrailer = 0;
  let trailerWeight = 0;
  let costCoefficient = 1;
  if (form.routeWithTrailer !== 0) {
    routeWithTrailer = Number(form.routeWithTrailer);
  }
  if (form.trailerWeight !== 0) {
    trailerWeight = Number(form.trailerWeight);
  }
  if (form.costCoefficient !== 0) {
    costCoefficient = Number(form.costCoefficient);
  }
  return (
    Math.round(
      costCoefficient *
      Number(form.cargoCoefficient) *
        100 *
        parseInt(routeWithTrailer) *
        parseInt(trailerWeight)
    ) / 100
  );
};
export const expendedWithTotalTime = (form) => {
  let timeCost = 0;
  let routTotalTime = 0;
  let costCoefficient = 0;
  if (form.routTotalTime !== 0) {
    routTotalTime = Number(form.routTotalTime);
  } else {
      routTotalTime = Number(form.timeWithTime);
  }
  if (form.timeCost !== 0) {
    timeCost = Number(form.timeCost);
  }
  if (form.costCoefficient !== 0) {
    costCoefficient = Number(form.costCoefficient);
  }
  return (
    Math.round(parseInt(timeCost * routTotalTime * costCoefficient * 100)) / 100
  );
};
export const routeBalanceStart = (form) => {
    let balanceStart = 0;
    let received = 0;
    if(form.balanceStart !== ""){
        balanceStart = Number(form.balanceStart);
    }
    if(form.received !== ""){
        received = Number(form.received);
    }
    return (
        (parseInt(balanceStart*100) + parseInt(received*100))/100
    )
}
