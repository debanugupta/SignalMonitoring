using Microsoft.AspNetCore.Mvc;
using SignalMonitoring.API.Models;
using SignalMonitoring.API.Persistence;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SignalMonitoring.API.Services
{
    public interface ISignalService
    {
        Task<bool> SaveSignalAsync(SignalInputModel inputModel);

        Task<ActionResult<IEnumerable<SignalViewModel>>> GetSignals();
    }
}
