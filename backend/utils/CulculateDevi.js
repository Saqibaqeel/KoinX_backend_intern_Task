const standardDeviation = (prices) => {
    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
        sum += prices[i];
    }
    const mean = sum / prices.length;
    
    let squaredDifferencesSum = 0;
    for (let i = 0; i < prices.length; i++) {
        const diff = prices[i] - mean;
        squaredDifferencesSum += Math.pow(diff, 2);
    }
    
    const variance = squaredDifferencesSum / prices.length;
    
    return Math.sqrt(variance);
};
module.exports=standardDeviation;
