// Cart state management for the shop
// Persists cart in localStorage

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  nameEn: string;
  price: number;
  quantity: number;
  category: 'tourism' | 'creative' | 'specialty';
}

export interface CartState {
  items: CartItem[];
  updatedAt: number;
}

const CART_KEY = 'dajilin_cart';

export function getCart(): CartState {
  if (typeof window === 'undefined') {
    return { items: [], updatedAt: Date.now() };
  }
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return { items: [], updatedAt: Date.now() };
    return JSON.parse(raw) as CartState;
  } catch {
    return { items: [], updatedAt: Date.now() };
  }
}

export function saveCart(cart: CartState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // Ignore storage errors
  }
}

export function addToCart(item: Omit<CartItem, 'quantity'>): CartState {
  const cart = getCart();
  const existing = cart.items.find((i) => i.productId === item.productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({ ...item, quantity: 1 });
  }
  cart.updatedAt = Date.now();
  saveCart(cart);
  return cart;
}

export function removeFromCart(productId: string): CartState {
  const cart = getCart();
  cart.items = cart.items.filter((i) => i.productId !== productId);
  cart.updatedAt = Date.now();
  saveCart(cart);
  return cart;
}

export function updateQuantity(productId: string, quantity: number): CartState {
  const cart = getCart();
  const item = cart.items.find((i) => i.productId === productId);
  if (item) {
    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.productId !== productId);
    } else {
      item.quantity = quantity;
    }
  }
  cart.updatedAt = Date.now();
  saveCart(cart);
  return cart;
}

export function clearCart(): CartState {
  const cart: CartState = { items: [], updatedAt: Date.now() };
  saveCart(cart);
  return cart;
}

export function getCartTotal(cart?: CartState): number {
  const c = cart ?? getCart();
  return c.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartItemCount(cart?: CartState): number {
  const c = cart ?? getCart();
  return c.items.reduce((sum, item) => sum + item.quantity, 0);
}

// Order types
export interface OrderContact {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  category: 'tourism' | 'creative' | 'specialty';
}

export interface Order {
  id: string;
  items: OrderItem[];
  contact: OrderContact;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  paymentMethod?: 'wechat' | 'alipay' | 'banktransfer' | 'cod';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  createdAt: number;
  updatedAt: number;
}

const ORDERS_KEY = 'dajilin_orders';

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

export function getOrder(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}

export function createOrder(
  items: OrderItem[],
  contact: OrderContact,
  total: number,
  paymentMethod?: Order['paymentMethod']
): Order {
  const orders = getOrders();
  const order: Order = {
    id: `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    items,
    contact,
    total,
    status: 'pending',
    paymentMethod,
    paymentStatus: 'unpaid',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  orders.unshift(order);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage errors
    }
  }
  return order;
}

export function updateOrderStatus(id: string, status: Order['status']): Order | undefined {
  const orders = getOrders();
  const order = orders.find((o) => o.id === id);
  if (order) {
    order.status = status;
    order.updatedAt = Date.now();
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      } catch {
        // Ignore storage errors
      }
    }
  }
  return order;
}

export function updateOrderPaymentStatus(id: string, paymentStatus: Order['paymentStatus']): Order | undefined {
  const orders = getOrders();
  const order = orders.find((o) => o.id === id);
  if (order) {
    order.paymentStatus = paymentStatus;
    order.updatedAt = Date.now();
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      } catch {
        // Ignore storage errors
      }
    }
  }
  return order;
}

// Shop product definitions for Phase 2
export interface ShopProduct {
  id: string;
  slug: string;
  category: 'tourism' | 'creative' | 'specialty';
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  unit: string;
  imagePlaceholder: string;
  inStock: boolean;
  stockCount?: number;
}

export const shopProducts: ShopProduct[] = [
  {
    id: 'tourism-service-pack-001',
    slug: 'tourism-service-pack',
    category: 'tourism',
    name: '文旅服务类产品说明',
    nameEn: 'Travel Services Package',
    description: '文旅服务类产品展示，包括研学资料包、路线服务包和咨询型服务产品。',
    descriptionEn: 'Travel service products including study tour packages, route service packages, and consultation services.',
    price: 0,
    unit: '套',
    imagePlaceholder: 'travel',
    inStock: true,
  },
  {
    id: 'creative-products-001',
    slug: 'creative-products',
    category: 'creative',
    name: '吉林地方文创说明',
    nameEn: 'Jilin Creative Products',
    description: '吉林地方文创和城市文化衍生产品展示。',
    descriptionEn: 'Jilin local creative products and cultural derivatives.',
    price: 0,
    unit: '套',
    imagePlaceholder: 'creative',
    inStock: true,
  },
  {
    id: 'northeast-specialties-001',
    slug: 'northeast-specialties',
    category: 'specialty',
    name: '东北特产商品方向说明',
    nameEn: 'Northeast Specialties',
    description: '东北特产商品展示，包括特色食品、手工艺品等地方好物。',
    descriptionEn: 'Northeast specialty products including local food, handicrafts, and other regional goods.',
    price: 0,
    unit: '套',
    imagePlaceholder: 'specialty',
    inStock: true,
  },
];

export function getProductsByCategory(category: ShopProduct['category']): ShopProduct[] {
  return shopProducts.filter((p) => p.category === category);
}
