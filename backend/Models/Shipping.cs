using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Shipping
{
    public int ShippingId { get; set; }

    public string? ShippingMethod { get; set; }

    public string? TrackingNumber { get; set; }

    public decimal? ShippingCost { get; set; }

    public DateOnly? ShippedDate { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
