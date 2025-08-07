using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string? Role { get; set; }

    public DateTime? CreatedDate { get; set; }
}
