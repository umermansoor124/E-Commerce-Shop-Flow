import { Link } from 'react-router-dom'
import './Products.css'

const products = [
  { _id: '64b1f2e8d9c1a2b3c4d5e6f1', name: 'Sony XM5 ANC', category: 'Electronics', price: 75000, stock: 12, description: 'World-class noise cancelling headphones for pure cinematic audio.', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e6f2', name: 'MacBook Pro M3', category: 'Electronics', price: 550000, stock: 3, description: 'The beast for developers and cinematic editors.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e6f3', name: 'Sony Alpha A7', category: 'Electronics', price: 245000, stock: 2, description: 'Capture cinematic moments with professional grade precision.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e6f4', name: 'Apple Watch Black', category: 'Electronics', price: 85000, stock: 3, description: 'The ultimate smart watch for elite performance.', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e6f5', name: 'Mech Keyboard', category: 'Electronics', price: 18000, stock: 4, description: 'Tactile mechanical keyboard with RGB dark aesthetic.', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e6f6', name: 'DJI Mavic Air', category: 'Electronics', price: 185000, stock: 4, description: 'Capture 4K cinematic shots from the sky.', image: 'https://images.unsplash.com/photo-1524143878510-e3b8d6312402?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e6f7', name: 'AirPods Max', category: 'Electronics', price: 145000, stock: 6, description: 'Space Gray luxury audio for the elite.', image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e6f8', name: 'Gaming Monitor', category: 'Electronics', price: 95000, stock: 4, description: 'Ultrawide curved monitor for ultimate immersion.', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e6f9', name: 'Stealth Tech Pack', category: 'Accessories', price: 25000, stock: 10, description: 'Waterproof matte black backpack for your cinematic gear and travel.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e610', name: 'iPhone 15 Pro Max', category: 'Electronics', price: 320000, stock: 5, description: 'Titanium build with a dark matte finish.', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e611', name: 'Nike Air Max', category: 'Shoes', price: 12000, stock: 10, description: 'Premium athletic shoes for cinematic style.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e612', name: 'Leather Jacket', category: 'Clothing', price: 8500, stock: 5, description: 'Classic pure leather jacket with a badass dark vibe.', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e613', name: 'Aviator Shades', category: 'Accessories', price: 4500, stock: 20, description: 'Luxury dark shades to elevate your look.', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e614', name: 'Levi Jeans', category: 'Clothing', price: 5500, stock: 15, description: 'Signature aesthetic denim for zero compromise.', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e615', name: 'Black Hoodie', category: 'Clothing', price: 6000, stock: 8, description: 'Minimalist premium hoodie for the grind.', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e616', name: 'Noir Cologne', category: 'Fragrance', price: 15000, stock: 7, description: 'Dark, woody, mysterious scent for the shadows.', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e617', name: 'Leather Duffel', category: 'Travel', price: 22000, stock: 6, description: 'Luxury travel bag for those who move in style.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e618', name: 'Luxury Watch', category: 'Accessories', price: 1500000, stock: 1, description: 'The ultimate luxury timepiece in matte black.', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e619', name: 'Chelsea Boots', category: 'Shoes', price: 18000, stock: 9, description: 'Sleek black suede boots for a sharp aesthetic.', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e620', name: 'Sterling Silver Chain', category: 'Accessories', price: 3500, stock: 30, description: 'Minimalist silver for a touch of detail.', image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e621', name: 'PS5 Console Black', category: 'Gaming', price: 165000, stock: 5, description: 'Next-gen gaming experience in a custom dark chassis.', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e622', name: 'Razer Gaming Mouse', category: 'Gaming', price: 15000, stock: 10, description: 'Ultra-fast mouse for precision strikes.', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e623', name: 'Smart Audio Glasses', category: 'Electronics', price: 45000, stock: 6, description: 'Listen to your cinematic soundtrack in total stealth.', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e624', name: 'Tech Organizer', category: 'Accessories', price: 8000, stock: 15, description: 'Keep your cinematic gear sorted with this dark aesthetic pouch.', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e625', name: 'Matte Black Mug', category: 'Lifestyle', price: 2500, stock: 25, description: 'Minimalist mug for your dark roast coffee.', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e626', name: 'Smart LED Shapes', category: 'Lifestyle', price: 35000, stock: 12, description: 'Modular lighting for your aesthetic setup.', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e627', name: 'Espresso Machine Black', category: 'Lifestyle', price: 55000, stock: 4, description: 'Premium shots for the late-night dev grind.', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e628', name: 'Leather Slim Wallet', category: 'Lifestyle', price: 4500, stock: 18, description: 'Minimal bifold leather for the essentials.', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e629', name: 'Yoga Mat Black', category: 'Lifestyle', price: 6500, stock: 10, description: 'Stay fit with a minimal dark aesthetic.', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80' },
  { _id: '64b1f2e8d9c1a2b3c4d5e630', name: 'Luxury Fountain Pen', category: 'Lifestyle', price: 18000, stock: 5, description: 'Executive matte black pen for signing the biggest deals.', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80' }
];

function Products() {
  return (
    <div className='products'>
      <div className='products-header'>
        <div className='products-header-left'>
          <p className='products-eyebrow'>
            <span className='products-eyebrow-line'></span>
            ALL PRODUCTS
          </p>
          <h1 className='products-title'>
            <span className='products-title-solid'>SHOP</span>
            <span className='products-title-ghost'>ALL.</span>
          </h1>
        </div>
        <div className='products-header-right'>
          <p className='products-count'>{products.length} ITEMS</p>
        </div>
      </div>

      <div className='products-grid'>
        {products.map((product, index) => (
          <Link to={`/products/${product._id}`} key={product._id} className='product-card'>
            <div className='product-card-image'>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.8' }} />
              <span className='product-card-num'>0{index + 1}</span>
            </div>
            <div className='product-card-info'>
              <div className='product-card-top'>
                <span className='product-card-category'>{product.category}</span>
                <span className='product-card-stock'>{product.stock} IN STOCK</span>
              </div>
              <h3 className='product-card-name'>{product.name}</h3>
              <div className='product-card-bottom'>
                <span className='product-card-price'>RS. {product.price.toLocaleString()}</span>
                <span className='product-card-arrow'>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Products