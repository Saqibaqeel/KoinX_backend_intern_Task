const Crypto=require('../models/CyptoModel');
const standardDeviation=require('../utils/CulculateDevi')
const axios=require('axios')

const Fetching = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                ids: 'bitcoin,matic-network,ethereum'
            }
        });

        const data = response.data;

        for (const coin of data) {
            const { id: coinName, current_price: price, market_cap: marketCap, price_change_percentage_24h: change24h, image: img } = coin;

            await Crypto.create({
                coin: coinName,
                price,
                marketCap,
                change24h,
                img
            });
        }

        console.log('Data fetched successfully!');
    } catch (error) {
        console.error('Error while fetching data:', error);
    }
};


//find based on query 
const latestStat = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ message: 'Query parameter "query" is required.' });
    }

    if (coin !== 'bitcoin' && coin !== 'matic-network' && coin !== 'ethereum') {
        return res.status(400).json({ message: 'Invalid query. Must be one of: bitcoin, matic-network, ethereum.' });
    }

    try {
        const data = await Crypto.find({ coin}).sort({ timestamp: -1 });

        if (data.length === 0) {
            return res.status(404).json({ message: `No data found for ${coin}.` });
        }

        res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching data.' });
    }
};

//deviation


const deviation = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ message: 'Query parameter "coin" is required.' });
    }

    if (coin !== 'bitcoin' && coin !== 'matic-network' && coin !== 'ethereum') {
        return res.status(400).json({ message: 'Invalid coin. Must be one of: bitcoin, matic-network, ethereum.' });
    }

    try {
        const data = await Crypto.find({ coin })
            .sort({ timestamp: -1 })
            .limit(100);

        if (data.length === 0) {
            return res.status(404).json({ message: `No data found for ${coin}.` });
        }

        const prices = data.map(record => record.price);

        const std = standardDeviation(prices);

        res.status(200).json({  std });
    } catch (error) {
        return res.status(500).json({ error: 'Error calculating standard deviation.' });
    }
};
//geting all data
const getAll = async (req, res) => {
    try {
      const data = await Crypto.find({});
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error while fetching data' });
    }
  };
  



module.exports= {Fetching,latestStat,deviation,getAll};