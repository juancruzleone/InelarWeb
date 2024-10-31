export function filterOrders(orders, searchTerm) {
  if (!Array.isArray(orders) || typeof searchTerm !== 'string') {
    return [];
  }

  const lowerSearchTerm = searchTerm.toLowerCase();

  return orders.filter(order => {
    if (!order) return false;

    const idMatch = order._id && order._id.toLowerCase().includes(lowerSearchTerm);
    const itemsMatch = order.items && order.items.some(item => 
      item.nombre && item.nombre.toLowerCase().includes(lowerSearchTerm)
    );

    return idMatch || itemsMatch;
  });
}

export function formatDate(dateString) {
  if (!dateString) return 'Fecha no disponible';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Fecha inválida';

  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatCurrency(amount) {
  if (typeof amount !== 'number') return '$0.00';

  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(amount);
}

export function getOrderStatus(status) {
  const statusMap = {
    'procesando': 'Procesando',
    'enviado': 'Enviado',
    'entregado': 'Entregado',
    'cancelado': 'Cancelado'
  };

  return statusMap[status] || 'Pendiente';
}