﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SignalMonitoring.API.Models;
using SignalMonitoring.API.Persistence;

namespace SignalMonitoring.API.Services
{
    public class SignalService : ISignalService
    {
        private readonly MainDbContext _mainDbContext;

        public SignalService(MainDbContext mainDbContext)
        {
            _mainDbContext = mainDbContext;
        }

        public async Task<ActionResult<IEnumerable<SignalViewModel>>> GetSignals()
        {

            var signals = (from s in _mainDbContext.Signals
                           select new SignalViewModel
                          {
                              CustomerName = s.CustomerName,
                              Description = s.Description,
                              Area = s.Area,
                              Zone = s.Zone,
                              SignalStamp = ""
                          }
                          ).ToListAsync();
            return await signals;
        }
        public async Task<bool> SaveSignalAsync(SignalInputModel inputModel)
        {
            try
            {
                //map input model to data model
                //at this point we assume a signal arrives only one time and it's unique
                SignalDataModel signalModel = new SignalDataModel();
                signalModel.CustomerName = inputModel.CustomerName;
                signalModel.Description = inputModel.Description;
                signalModel.AccessCode = inputModel.AccessCode;
                signalModel.Area = inputModel.Area;
                signalModel.Zone = inputModel.Zone;
                signalModel.SignalDate = DateTime.Now;
                
                //execute some business rules according to your cases.

                //if you decide to save signal add it to the db context
                _mainDbContext.Signals.Add(signalModel);

                //save changes and if the signal has stored in db return true.
                return await _mainDbContext.SaveChangesAsync() > 0;
            }
            catch (Exception exception)
            {
                //log the exception or take some actions

                return false;
            }
        }
    }
}
