import { RuleConfig } from './Item';

const requireValidate = (name: string, value: any, rule: RuleConfig): string => {
    if ((value === null || value === undefined || value === '') || (Array.isArray(value) && !value.length)) {
        return rule.msg || `${name} is required`;
    }
    return '';
}

const lengthValidate = (name: string, value: any, rule: RuleConfig): string => {
    if (Array.isArray(value) && value.length !== rule.len) {
        return rule.msg || `${name} requireds length of ${rule.len}`;
    }
    if (typeof value === 'string' && value.length !== rule.len) {
        return rule.msg || `${name} requireds length of ${rule.len}`;
    }
    return '';
}

const maxValidate = (name: string, value: any, rule: RuleConfig): string => {
    if (Array.isArray(value) && value.length > rule.max) {
        return rule.msg || `${name} cannot be longer then ${rule.max}`;
    }
    if (typeof value === 'string' && value.length > rule.max) {
        return rule.msg || `${name} cannot be longer then ${rule.max}`;
    }
    if (typeof value === 'number' && value > rule.max) {
        return rule.msg || `${name} cannot be larger then ${rule.max}`;
    }
    return '';
}

const minValidate = (name: string, value: any, rule: RuleConfig): string => {
    if (Array.isArray(value) && value.length < rule.min) {
        return rule.msg || `${name} cannot be longer then ${rule.min}`;
    }
    if (typeof value === 'string' && value.length < rule.max) {
        return rule.msg || `${name} cannot be longer then ${rule.min}`;
    }
    if (typeof value === 'number' && value < rule.min) {
        return rule.msg || `${name} cannot be larger then ${rule.min}`;
    }
    return '';
}

const regexValidate = (name: string, value: any, rule: RuleConfig): string => {
    if (!rule.regex.test(value)) return rule.msg || `${name} should be the format of ${rule.regex}`;
    return '';
}

export const ruleCheck = (name: string, value: any, rules: RuleConfig[]): string => {
    for (let i = 0; i < rules.length; i ++) {
        const rule = rules[i];
        if (rule.required) {
            const msg = requireValidate(name, value, rule);
            if (msg) return msg;
            else continue;
        }
        if (rule.len) {
            const msg = lengthValidate(name, value, rule);
            if (msg) return msg;
            else continue;
        }
        if (rule.max) {
            const msg = maxValidate(name, value, rule);
            if (msg) return msg;
            else continue;
        }
        if (rule.min) {
            const msg = minValidate(name, value, rule);
            if (msg) return msg;
            else continue;
        }
        if (rule.regex && !rule.regex.test(value)) {
            const msg = regexValidate(name, value, rule);
            if (msg) return msg;
            else continue;
        }
    }
    return '';
}